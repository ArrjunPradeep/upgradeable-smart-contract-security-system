import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SlitherResult } from './slither-report.schema';

@Injectable()
export class SlitherReportService {
  private readonly logger = new Logger(SlitherReportService.name);
  private readonly reportsDir = join(process.cwd(), 'slither-reports');

  constructor(@InjectModel('SlitherResult') private readonly slitherResultModel: Model<SlitherResult>) {}

  async runSlither(filepath: string, outputFilename: string): Promise<void> {
    await this.ensureReportsDirExists();

    const outputFilePath = join(this.reportsDir, outputFilename);
    const command = `slither ${filepath} --json ${outputFilePath}`;
    this.logger.log(`Executing command: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, async (error, stdout, stderr) => {

        if (stderr) {
          this.logger.warn(`Slither stderr: ${stderr}`);
        }

        this.logger.log(`Slither stdout: ${stdout}`);

        try {
          // Log before reading the file
          this.logger.log(`Attempting to read file at: ${outputFilePath}`);

          // Read the contents of the output file
          const fileContents = await fs.readFile(outputFilePath, 'utf8');

          // Log after reading the file
          this.logger.log(`File read successfully. Contents length: ${fileContents.length}`);

          // Parse the JSON data
          const jsonData = JSON.parse(fileContents);

          // Filter the JSON data using the filterSlitherOutput function
          const filteredResults = filterSlitherOutput(jsonData);

          // Log the filtered results
          this.logger.log(`Filtered Slither results: ${JSON.stringify(filteredResults, null, 2)}`);

          // Save the filtered results to MongoDB
          await this.saveFilteredResults(filteredResults);

          resolve();
        } catch (fileError) {
          this.logger.error(`Error reading or parsing file: ${fileError.message}`);
          reject(fileError);
        }
      });
    });
  }

  private async ensureReportsDirExists(): Promise<void> {
    try {
      await fs.mkdir(this.reportsDir, { recursive: true });
    } catch (error) {
      this.logger.error(`Error creating reports directory: ${error.message}`);
      throw error;
    }
  }

  private async saveFilteredResults(results: any[]): Promise<void> {
    try {
      await this.slitherResultModel.insertMany(results);
      this.logger.log(`Filtered results saved to MongoDB successfully.`);
    } catch (error) {
      this.logger.error(`Error saving results to MongoDB: ${error.message}`);
      throw error;
    }
  }
}

// Function to filter and adjust the Slither output
function filterSlitherOutput(slitherJson: any) {
  const keysToExtract = ['id', 'description', 'check', 'impact', 'confidence'];
  let filteredResults: any[] = [];

  if (slitherJson && slitherJson.results && Array.isArray(slitherJson.results.detectors)) {
    filteredResults = slitherJson.results.detectors.map((detector: any) => {
      let filteredDetector: any = {};
      keysToExtract.forEach(key => {
        if (detector.hasOwnProperty(key)) {
          if (key === 'description') {
            const match = detector.description.match(/^[^\s]+\([^\)]+\)/);
            filteredDetector[key] = match ? match[0] : detector.description;
          } else {
            filteredDetector[key] = detector[key];
          }
        }
      });
      return filteredDetector;
    });
  }

  return filteredResults;
}
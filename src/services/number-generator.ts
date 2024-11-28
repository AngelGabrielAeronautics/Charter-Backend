import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyCount } from '../schemas/daily-count.schema';

@Injectable()
export class NumberGeneratorService {
  constructor(
    @InjectModel(DailyCount.name) private dailyCountModel: Model<DailyCount>,
  ) { }

  async generateNumber(prefix: 'INV' | 'BKN'): Promise<string> {
    const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    // Find or create today's daily count
    const dailyCount = await this.dailyCountModel.findOneAndUpdate(
      { date: today },
      { $setOnInsert: { bookingCount: 0, invoiceCount: 0 } },
      { new: true, upsert: true },
    );

    let sequence: number;
    if (prefix === 'BKN') {
      dailyCount.bookingCount += 1;
      sequence = dailyCount.bookingCount;
    } else if (prefix === 'INV') {
      dailyCount.invoiceCount += 1;
      sequence = dailyCount.invoiceCount;
    }

    // Save the updated count
    await dailyCount.save();

    // Format the sequence as a 3-digit string
    const sequenceNumber = String(sequence).padStart(3, '0');

    // Return the generated number
    return `${prefix}-${today.replace(/-/g, '')}-${sequenceNumber}`;
  }
}

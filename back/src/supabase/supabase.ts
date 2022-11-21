import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class Supabase {
  private supabase: SupabaseClient;
  constructor(private configService: ConfigService) {}

  getClient() {
    if (this.supabase) return this.supabase;
    this.supabase = createClient(
      this.configService.get<string>('PROJECT_URL'),
      this.configService.get<string>('API_KEY'),
    );
    return this.supabase;
  }
}

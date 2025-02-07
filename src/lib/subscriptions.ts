import { supabase } from './supabase';

export async function subscribeToNewsletter(email: string) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .insert({ email })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('You are already subscribed to our newsletter!');
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
}
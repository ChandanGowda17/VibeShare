'use server';
/**
 * @fileOverview An AI agent that suggests captions and hashtags for uploaded media.
 *
 * - suggestCaptionsAndHashtags - A function that handles the caption and hashtag suggestion process.
 * - AICaptionAndHashtagSuggestionsInput - The input type for the suggestCaptionsAndHashtags function.
 * - AICaptionAndHashtagSuggestionsOutput - The return type for the suggestCaptionsAndHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICaptionAndHashtagSuggestionsInputSchema = z.object({
  mediaDataUri: z
    .string()
    .describe(
      "The uploaded media (photo or video), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
});
export type AICaptionAndHashtagSuggestionsInput = z.infer<typeof AICaptionAndHashtagSuggestionsInputSchema>;

const AICaptionAndHashtagSuggestionsOutputSchema = z.object({
  captions: z.array(z.string()).describe('An array of relevant and engaging caption suggestions for the media.'),
  hashtags: z.array(z.string()).describe('An array of relevant and popular hashtag suggestions for the media.')
});
export type AICaptionAndHashtagSuggestionsOutput = z.infer<typeof AICaptionAndHashtagSuggestionsOutputSchema>;

export async function suggestCaptionsAndHashtags(input: AICaptionAndHashtagSuggestionsInput): Promise<AICaptionAndHashtagSuggestionsOutput> {
  return aiCaptionAndHashtagSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCaptionAndHashtagSuggestionsPrompt',
  input: {schema: AICaptionAndHashtagSuggestionsInputSchema},
  output: {schema: AICaptionAndHashtagSuggestionsOutputSchema},
  prompt: `You are an AI social media assistant. Your task is to analyze the provided media and suggest engaging captions and relevant hashtags.\n\nGenerate 3-5 distinct caption suggestions. Each caption should be creative and suitable for a social media post.\nGenerate 5-10 relevant and popular hashtag suggestions.\n\nMedia: {{media url=mediaDataUri}}`
});

const aiCaptionAndHashtagSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiCaptionAndHashtagSuggestionsFlow',
    inputSchema: AICaptionAndHashtagSuggestionsInputSchema,
    outputSchema: AICaptionAndHashtagSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
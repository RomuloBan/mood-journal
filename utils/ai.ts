import { OpenAI } from '@langchain/openai'
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry. Should be one of the following: happy, sad, angry, anxious, excited, or neutral.'),
      subject: z.string().describe('the subject of the journal entry.'),
    summary: z
      .string()
      .describe('quick summary of the entire entry. Should be a single sentence.'),
    negative: z
      .boolean()
      .describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
  })
)

const getPrompt = async (content: any) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: 
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({ 
    entry: content 
  })
  return input
}

export const analize = async (prompt: string) => {
  const input = await getPrompt(prompt)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo'})
  const result = await model.invoke(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.error(e)
  }
}

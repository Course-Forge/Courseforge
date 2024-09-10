
import openai
import os
from time import time,sleep
import textwrap
import re

from os import path
file_path = path.abspath(__file__) # full path of your script
dir_path = path.dirname(file_path) # full path of the directory of your script
prompt_file_path = path.join(dir_path,'prompt.txt') # absolute zip file path
gpt3_logs_file_path = path.join(dir_path, 'gpt3_logs/')

def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()

def save_file(content, filepath):
    with open(filepath, 'w', encoding='utf-8') as outfile:
        outfile.write(content)

def gpt3_completion(prompt, engine='text-davinci-002', temp=0.6, top_p=1.0, tokens=2000, freq_pen=0.25, pres_pen=0.0, stop=['<<END>>']):
    max_retry = 5
    retry = 0
    while True:
        try:
            response = openai.Completion.create(
                engine=engine,
                prompt=prompt,
                temperature=temp,
                max_tokens=tokens,
                top_p=top_p,
                frequency_penalty=freq_pen,
                presence_penalty=pres_pen,
                stop=stop)
            text = response['choices'][0]['text'].strip()
            text = re.sub('\s+', ' ', text)
            filename = '%s_gpt3.txt' % time()
            with open((gpt3_logs_file_path + '%s') % filename, 'w') as outfile:
                outfile.write('PROMPT:\n\n' + prompt + '\n\n==========\n\nRESPONSE:\n\n' + text)
            return text
        except Exception as oops:
            retry += 1
            if retry >= max_retry:
                return "GPT3 error: %s" % oops
            print('Error communicating with OpenAI:', oops)
            sleep(1)


def summarize(choice):
    alltext = open_file('input.txt')
    chunks = textwrap.wrap(alltext, 2000)
    #chunks = alltext.split("\n")
    #chunks = [x for x in chunks if x != '']
    result = list()
    count = 0

    directions = {'short':["I missed a meeting for work, and the following text is an audio transcription of that meeting. Write a quick summary for the transcription, using college-level PhD language.", "AUDIO TRANSCRIPTION:\n"], 
                  'long':["Write a detailed, long form summary using the same tense and perspective of the following:", "EXTENSIVE DETAILED SUMMARY:\n"], 
                  'bullets':["Create a bulleted list, highlighting the main points of the following:", "BULLETED LIST:\n-"],
                  'email':['Write a detailed summary using the same tense and perspective of the following text in the format of a professional email:', 'DETAILED EMAIL SUMMARY:\n']
                 }
    for chunk in chunks:
        prompt = open_file(prompt_file_path).replace('<<SUMMARY>>', chunk)
        prompt = prompt.replace('<<DIRECTIONS>>',directions[choice][0])
        prompt = prompt.replace("<<COMMAND>>", directions[choice][1])
        prompt = prompt.encode(encoding='ASCII',errors='ignore').decode()
        summary = gpt3_completion(prompt)
        if (choice == 'bullets'):
            summary = " - " + summary
            summary = re.sub(' -', '\n\n - ', summary)
        result.append(summary)
    #save_file('\n\n'.join(result), 'outputs/output_test_%s.txt' % time())
    ans = "\n\n".join(result)
    return [ans, open_file('input.txt')]


 

'''Issues - chunks cut off sections of prompt - play with argument?
try splitting list and removing certain words (stop words that have no value like umm, yeah, the)
try varying chunks sizes and make sure they contain a proportional amount of information
try splitting list and appending sentences into paragraphs (while tokens<500 --> append) '''
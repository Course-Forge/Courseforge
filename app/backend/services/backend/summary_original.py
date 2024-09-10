import openai
import os
from time import time,sleep
import textwrap
import re


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
            with open('gpt3_logs/%s' % filename, 'w') as outfile:
                outfile.write('PROMPT:\n\n' + prompt + '\n\n==========\n\nRESPONSE:\n\n' + text)
            return text
        except Exception as oops:
            retry += 1
            if retry >= max_retry:
                return "GPT3 error: %s" % oops
            print('Error communicating with OpenAI:', oops)
            sleep(1)


if __name__ == '__main__':
    alltext = open_file('input.txt')
    #chunks = textwrap.wrap(alltext, 4000)
    chunks = alltext.split("\n")
    chunks = [x for x in chunks if x != '']
    result = list()
    count = 0
    choice = 'bullets' ###EDIT FOR DIFFERENT PROMPT
    directions = {'short':["Write a concise summary of the following:", "CONCISE SUMMARY:"], 
                  'long':["Write a detailed summary of the following:", "DETAILED SUMMARY:"], 
                  'bullets':["Create a summary of bulleted sentences of the following:", "BULLETED LIST:\n-"]
                 }
    for chunk in chunks:
        count += 1
        prompt = open_file('prompt.txt').replace('<<SUMMARY>>', chunk)
        prompt = prompt.replace('<<DIRECTIONS>>',directions[choice][0])
        prompt = prompt.replace("<<COMMAND>>", directions[choice][1])
        prompt = prompt.encode(encoding='ASCII',errors='ignore').decode()
        summary = gpt3_completion(prompt)
        print('\n\n\n', count, 'of', len(chunks), ' - ', summary)
        if (choice == 'bullets'):
            summary = " - " + summary
            summary = re.sub(' -', '\n\n - ', summary)
        result.append(summary)
    save_file('\n\n'.join(result), '/outputs/output_%s.txt' % time())
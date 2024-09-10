import openai
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
from time import time,sleep
import re
import uuid


from os import path
file_path = path.abspath(__file__) # full path of your script
dir_path = path.dirname(file_path) # full path of the directory of your script
input_file_path = path.join(dir_path, 'input.txt')
prompt_file_path = path.join(dir_path,'prompt.txt') # absolute zip file path
bullet_file_path = path.join(dir_path, 'bullets.txt')
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


def summarize(transcript, choice, language):
    random = str(uuid.uuid4())
    alltext = transcript
    chunks = [transcript[i:i+2000] for i in range(0, len(transcript), 2000)]
    #chunks = alltext.split("\n")
    #chunks = [x for x in chunks if x != '']
    result = list()
    count = 0

    directions_alt = {
        "short": [
            f"""The following are important rules to writing a well-made short summary of an input text:
            - Keep important details such as time
            - Avoid sounding robotic or repetitive, each sentence should flow smoothly by themselves and with each other. Use a {language} level vocabulary.
            - Keep details that reaffirm the big idea of the text.
            - Exercise creativity in the writing style, but maintain professionalism.
            - Make sure each sentence is grammatically correct.
            - Do not give him a summary split into multiple sections
            - Use the same tense as the text
            Summarize the following content using these guidelines.""", "CONTENT TO SUMMARIZE: \n"
        ],
        "bullets": [
            f"""The following is a conversation between a professor and his student, the professor is asking the student to summarize a piece of text.
            PROFESSOR: I want a bulleted list of key ideas and I hope you can give me your best work.
            Here are some ideas of what I'm looking for in your summary, but build upon them and write freely. Please keep the tense and perspective of the text and write with a {language} level vocabulary/language.
            - Each bullet point shouldn't be too short, keep as many details as possible in two sentences for each bullet point.- Keep important details such as time
            - Avoid sounding robotic or repetitive, each bullet point should flow smoothly by themselves and with each other. Use a {language} level vocabulary.
            - Avoid having more than 5 bullet points.
            - Keep ideas like goals and deadlines, reaffirm the big idea of the text.
            STUDENT: Great! Thank you for giving me some tips, would you mind giving me a good example of these suggestions in practice?
            PROFESSOR: Of course! For example, with this text: "The term "cybersecurity" has been the subject of academic and popular
            literature that has largely viewed the topic from a particular perspective. Based on the literature review described in
            this article, we found that the term is used broadly and its definitions are highly variable, context-bound, often
            subjective, and, at times, uninformative. There is a paucity of literature on what the term actually means and how it is
            situated within various contexts. The absence of a concise, broadly acceptable definition that captures the multidimensionality
            of cybersecurity potentially impedes technological and scientific advances by reinforcing the predominantly technical view of
            cybersecurity while separating disciplines that should be acting in concert to resolve complex cybersecurity challenges. For
            example, there is a spectrum of technical solutions that support cybersecurity. However, these solutions alone do not solve
            the problem; there are numerous examples and considerable scholarly work that demonstrate the challenges related to organizational,
            economic, social, political, and other human dimensions that are inextricably tied to cybersecurity efforts
            (e.g., Goodall et al., 2009; Buckland et al., 2010; Deibert, 2012). Fredrick Chang (2012), former Director of Research at the
            National Security Agency in the United States discusses the interdisciplinary nature of cybersecurity."
            Something like this would be great, but it's preferable that you have five bullet points instead of three:
            - Based on a literature review, the term "cybersecurity" is used broadly with highly variable, context-bound, often subjective, and sometimes uninformative definitions.
            - The lack of a widely-accepted definition for cybersecurity that captures its multidimensionality potentially hampers technological and scientific advances by reinforcing a predominantly technical view of cybersecurity while separating disciplines that should be working together to resolve complex cybersecurity challenges.
            - Cybersecurity efforts are tied to organizational, economic, social, political, and other human dimensions.

            STUDENT: Great! I like how concise but direct it was, everything flows together!
            PROFESSOR: Try and summarize the following text using the guidelines above.""", "TEXT TO SUMMARIZE INTO BULLETS: \n"
        ],
        "long":[
            f"""The following is a conversation between a student and an expert professor who is renowned for an innate ability to turn any length content into a very detailed and thorough summary.
            \n\n STUDENT: \n Hey professor, everyone knows you're incredible at turning any length content into rich and informative summaries, what are the key focuses that you keep in mind to do 
            so, so effectively? \n \n PROFESSOR: \n There are a few key things that I keep in mind when summarizing content: \n\n 1. Make sure to identify the most important points and ideas. \n 2. 
            Organize the information in a way that is logical and easy to follow.\n 3. Be concise – use language that is clear and concise. \n 4. Use your own voice – don't try to imitate the 
            author's style, but make sure the summary sounds like you. \n\n STUDENT:\n Can you elaborate on each of those? I would like to turn this into a template anyone could follow to convert 
            content to comprehensive summaries as great as you can. \n\n PROFESSOR: \n Sure. When identifying the most important points, I look for the main ideas that the author is trying to 
            communicate. I then try to distill these down into a few key points that I can focus on in the summary. \n\n  - When it comes to organization, I make sure to structure the information 
            in a way that is easy to follow. I want the reader to be able to understand the main points without getting bogged down in too many details. \n  - Concision is important because it 
            allows the reader to quickly grasp the main ideas. I use language that is clear and concise, and I avoid unnecessary words or phrases. \n  - Finally, I use my own voice when writing 
            the summary. I don't try to imitate the author's style, but I make sure that the summary sounds like me. This allows the reader to connect with the summary and understand the main 
            ideas more easily. \n\n STUDENT: \n These are great! Would you mind showing me this in practice while using the same tense and perspective and {language} level language? Here is some 
            content to summarize:""", 
            f"PROFFESOR: \n Sure, no problem. I spent the weekend looking through this, and here is long and detailed summary I came up with that uses {language} level language: \n"
        ],
        "email":[
            f"""The following is a conversation between a student and an expert professor who is renowned for an innate ability to turn any length content into a very professional and detailed email. 
            \n\n STUDENT: \n Hey professor, everyone knows you're incredible at turning any length content into a rich and informative email, what are the key focuses that you keep in mind to do so, 
            so effectively? \n\n PROFESSOR: \n There are a few key things that I keep in mind when summarizing content: \n\n 1. Make sure to include all the key points and information that the reader 
            needs to know. \n 2. Be as concise as possible - get straight to the point. \n 3. Use rich and detailed language to make the email more professional and engaging. \n 4. Edit and proofread 
            your email before sending it off to avoid any mistakes. \n\n STUDENT: \n Can you elaborate on each of those? I would like to turn this into a template anyone could follow to convert 
            content to comprehensive summary emails as great as you can. \n\n PROFESSOR: \n Sure. When identifying the most important points, I look for the main ideas that the author is trying to 
            communicate. I then try to distill these down into a few key points that I can focus on in the email. \n\n 1. Make sure to include all the key points and information that the reader needs 
            to know. This is the most important part of summarizing content - you need to make sure that all the essential information is included. \n\n 2. Be as concise as possible - get straight to 
            the point. This will help keep your email focused and on point. \n\n 3. Use rich and detailed language to make the email more professional and engaging. This will help make your email 
            stand out and grab the reader's attention. \n\n 4. Edit and proofread your email before sending it off to avoid any mistakes. This is a crucial step to ensure that your email is error-free 
            and polished. \n\n STUDENT: \n These are great! Would you mind showing me this in practice while using the same tense and perspective and {language} level language? Here is some content 
            to summarize:""",
            f"PROFFESOR: \n Sure, no problem. I spent the weekend looking through this, and here is concise and professional email I came up with that uses {language} level language: \n"
        ]
    }

    for chunk in chunks:
        prompt = open_file(prompt_file_path).replace('<<SUMMARY>>', chunk)
        prompt = prompt.replace('<<DIRECTIONS>>',f"{random} \n {directions_alt[choice][0]}")
        prompt = prompt.replace("<<COMMAND>>", directions_alt[choice][1])
        prompt = prompt.encode(encoding='ASCII',errors='ignore').decode()
        summary = gpt3_completion(prompt)
        if (choice == 'bullets'):
            summary = re.sub(' -', '\n\n - ', summary)
        result.append(summary)

    ans = "\n\n".join(result)
    print(language)
    return ans
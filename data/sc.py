import re
import json

# open files 
fin = open('nbw.js',mode='r',encoding='UTF-8')
fout = open('nbwilayat.js', mode='w', encoding='UTF-8')

## pattern pour le filter 
patter = re.compile('([0-9]+)( )([\w ]+)')
## list des objects 
l=[]

for line in fin.readlines():
    e = patter.match(line.rstrip())
    o={
      'code':e.group(1),
      'name':e.group(3),
    }
    ## add object to list of object 
    l.append(o)
    
## convert to json 
fout.write(json.dumps(l))
# close files 
fin.close()
fout.close()

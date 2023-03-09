import csv
import requests

parsed_data = []

f = open('passer.csv')
rdr = csv.reader(f)
for line in rdr:
    if line == []:
        continue
    parsed_data.append((line[0], "".join(line[3].split("-"))))

reqs = []

for data in parsed_data:
    req = "http://localhost:3000/sms/" + data[1] + "/name/" + data[0] + "/pn/p"
    reqs.append(req)

print(reqs)
reqs.pop(0)

print("서류합격 첫번째 확인 (yes):", end=" ")
sign = input()

if sign != "yes":
    exit(0)

for i in reqs:
    print(i)

print("서류합격 두번째 확인 (yes):", end=" ")
sign = input()

if sign != "yes":
    exit(0)

for i in reqs:
    print(i)


print("서류합격 최종 확인 (회장님):", end=" ")
sign = input()

if sign == "김지윤":
    for req in reqs:
        print("보내기 : ", req)
        requests.get(req)
    
# requests.get("http://localhost:3000/sms/01022689761/name/김지윤")

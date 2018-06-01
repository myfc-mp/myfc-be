from collections import deque
import pickle

dq = deque([],5)
dq.append(4)
dq.append(6)
dq.appendleft(1)
dq.append(3)
dq.append(9)
print(dq)
dq.append(0)
print(dq)
dq.appendleft(8)
print(dq)
# pickle可以把数据存到硬盘中，第一个参数是要存的数据，第二个参数是文件，需要用open打开，并且给可写和二进制打开参数
pickle.dump(dq,open('bak.pkl','wb'))
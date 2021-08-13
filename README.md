# jtrace

参考[JNI-Frida-Hook](https://github.com/Areizen/JNI-Frida-Hook)

增加更详细的jni信息打印

# 准备

```bash
pip install frida==14.2.18
pip install frida-tools==9.2.4
pip install objection==1.11.0
pip install hexdump
npm install
```

# 使用

```bash
frida -U -n com.xingin.xhs -l _agent.js -o jni.log
```

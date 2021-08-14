# jtrace

参考[JNI-Frida-Hook](https://github.com/Areizen/JNI-Frida-Hook)

增加更详细的jni信息打印

**完善ing**

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
frida -U -f com.xingin.xhs -l _agent.js -o jni.log --no-pause
frida -U -f com.iqiyi.i18n -l _agent.js -o jni.log --no-pause
frida -U -f com.cmcc.cmvideo.miguc -l _agent.js -o jni.log --no-pause
```

脚本正在完善中，使用请自行调整脚本

# 特性

- 日志与unidbg匹配，补环境效率up
- 对attach模式友好
- 代码易读

# 说明

- `show_cache_log` 用于决定是否打印下列jni方法的信息
    - `GetFieldID`
    - `GetStaticFieldID`
    - `GetMethodID`
    - `GetStaticMethodID`
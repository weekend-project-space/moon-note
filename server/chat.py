import os,sys
sys.path.append(os.getcwd())
from flask_cors import CORS
from flask import Flask,  request, jsonify
import openai

app = Flask(__name__)
cors = CORS(app,  supports_credentials=True)
app.jinja_env.variable_start_string = '<<<'
app.jinja_env.variable_end_string = '>>>'

openai.api_key = "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"

@app.route('/v1/chat/completions',methods=['POST','GET'])
def completions():
    data = request.get_json()
    print("headers",request.headers)
    #print("data", data)
    #国内服务器可以设置代理
    #openai.proxy = "http://192.168.101.22:10819"
    api_key = None
    if 'key' in data:
        api_key = data['key']
        print("case 1")
    else:
        authorization = request.headers['Authorization'] if 'Authorization' in request.headers else None
        if authorization is not None:
            # Authorization: `Bearer ${key.value}`,
            api_key = authorization[len('Bearer '):]
            print("case 2")
    if api_key is None:
        # demo = {'messages': [{'role': 'user', 'content': '3333'}], 'model': 'gpt-3.5-turbo', 'key':'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'}
        api_key = "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"
        # return jsonify({
        #     'success':False,
        #     'message':'plz add api-key in body or add Authorization',
        #     'debug':demo
        # })
        print("case 3")
    openai.api_key = api_key

    x = openai.ChatCompletion.create(
        # **data
        model="gpt-3.5-turbo",
        messages=data['messages']
    )
    return jsonify(x)

if __name__ == "__main__":
    port = 8118
    if len(sys.argv) >1:
        port = int(sys.argv[1])
    print(sys.argv , port)
    app.run(host='0.0.0.0', port=port ,debug=True)

# nginx conf
#    location /v1 {
#         proxy_pass http://127.0.0.1:8118;
#         access_log  /chatapi.log;
#         error_log  /chatapi.error.log;
#         proxy_redirect     off;
#         proxy_set_header   Host              $host;
#         proxy_set_header   X-Real-IP         $remote_addr;
#         proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
#         proxy_set_header   X-Forwarded-Proto $scheme;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection "upgrade";
#         proxy_next_upstream error timeout http_500;
#     }

import Vue from 'vue';

import MessageBox from './MessageBox';

//消息弹出框通过函数来调用
export default function(opts) {
    const defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        onCancel: () => {},
        onOk: () => {},
    };

    const MyComponent = Vue.extend(MessageBox);
    const vm = new MyComponent({
        el: document.createElement('div'),
        data: {
            title: opts.title || defaults.title,
            content: opts.content || defaults.content,
            cancel: opts.cancel || defaults.cancel,
            ok: opts.ok || defaults.ok
        },
        methods: {
            onCancel() {
                (opts.onCancel || defaults.onCancel).call(this);
                document.body.removeChild(vm.$el);
            },
            onOk() {
                (opts.onOk || defaults.onOk).call(this);
                document.body.removeChild(vm.$el);
            }
        }
    });
    document.body.appendChild(vm.$el);
};
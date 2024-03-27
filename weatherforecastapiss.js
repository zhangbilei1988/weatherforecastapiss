import { axiosConfig } from '@weatherforecastapiss/proxy';
import { sleep } from '@weatherforecastapiss/sleep';

// forum_website.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];
let posts = [];

// 用户注册
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // 实现用户注册逻辑，将用户信息保存到数据库中
    users.push({ username, password });
    res.status(201).json({ message: '用户注册成功' });
});

// 创建帖子
app.post('/createPost', (req, res) => {
    const { username, content } = req.body;
    // 实现创建帖子逻辑，保存帖子到数据库中
    posts.push({ username, content });
    res.status(201).json({ message: '帖子创建成功' });
});

// 添加评论
app.post('/addComment', (req, res) => {
    const { postId, username, comment } = req.body;
    // 实现添加评论逻辑，将评论保存到对应帖子的数据库中
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).json({ message: '帖子未找到' });
        return;
    }
    post.comments = post.comments || [];
    post.comments.push({ username, comment });
    res.status(200).json({ message: '评论添加成功' });
});

// 监听端口
const port = 3000;
app.listen(port, () => {
    console.log(`论坛网站后端运行在 http://localhost:${port}`);
});

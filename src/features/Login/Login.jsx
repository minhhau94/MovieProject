import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAction } from './redux/action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    // trả về thông tin user loging thành công => res.data.content
    // lưu data lên store
    try {
      await dispatch(loginAction(values));
      // navigate cho user qua trang home
      navigate("/");
    } catch (err) {
      // đường dẫn trên state
      console.log(err.response.data.content);
    }

  };

  return (
    <div className='container text-center'>
      <h1>Login</h1>
      <div className='flex justify-center pt-5'>
        <Form
          name="basic"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            // thêm validate vào rules
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản!',
              },
              // {
              //   pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: "Email không hợp lệ",
              // },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
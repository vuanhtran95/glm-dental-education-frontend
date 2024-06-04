import { Checkbox, Form, Input } from 'antd';

const SignUp = () => {
  const onFinish = () => {};
  return (
    <div className='w-128'>
      <h3 className='font-bold mb-16'>Create new account</h3>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Form.Item
          label='Full name'
          name='username'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Re-enter Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 18, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <input className='bg-transparent' />

        <Form.Item wrapperCol={{ offset: 20, span: 24 }}>
          <button className='bg-blue-500'>
            <p className='text-white'>Submit</p>
          </button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 14, span: 24 }}>
          <span className='mr-2'>
            <span className='mr-2'>Already has an account?</span>
            <a href='/login'>Login</a>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;

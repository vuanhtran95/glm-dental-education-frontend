import { Form, Formik } from 'formik';
import { getUserInfo } from '../../../utils';
import Input from '../../../components/input';
import Button from '../../../components/button';

function WelcomeBanner() {
  const user = getUserInfo();

  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <section className='bg-white '>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative'>
        <a
          href='#'
          className='inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
        >
          <span className='text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3'>
            New
          </span>
          <span className='text-sm font-medium'>
            New virtual patient, self directed learning platform has been
            launched
          </span>
          <svg
            className='w-2.5 h-2.5 ms-2 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
        </a>
        <h1 className='m-12 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          Hello {user?.fullName}
        </h1>
        <p className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200'>
          Please set up the patient information to start a new conversation
        </p>
        <form className='w-full max-w-md mx-auto'>
          <label
            htmlFor='default-email'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Symptoms
          </label>

          <Formik initialValues={initialValues} onSubmit={(values) => {}}>
            <Form className='flex flex-col gap-4'>
              <Input
                id='patientName'
                name='patientName'
                placeholder='Patient Name'
              />

              <div className='relative'>
                <Input id='symptoms' name='symptoms' placeholder='Symptoms' />
                <button
                  type='submit'
                  className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit <i className='fa-solid fa-circle-arrow-right'></i>
                </button>
              </div>
            </Form>
          </Formik>
        </form>
      </div>
      <div className='bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0'></div>
    </section>
  );
}

export default WelcomeBanner;

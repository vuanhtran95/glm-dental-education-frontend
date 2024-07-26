import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/button';
import { DialogDetail } from 'src/store/dialog/types';

interface Props {
  dialogs: DialogDetail[];
}

const DataTable = ({ dialogs }: Props) => {
  const navigate = useNavigate();

  const onClickEvaluate = useCallback(
    (id: string) => {
      navigate(`/evaluate/${id}`);
    },
    [navigate]
  );

  return (
    <div className='relative overflow-x-auto p-8'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Patient Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Symptoms
            </th>
            <th scope='col' className='px-6 py-3'>
              Student ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {dialogs?.map((dialog) => {
            return (
              <tr
                key={dialog._id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {dialog.scenario.patientName}
                </th>
                <td className='px-6 py-4'>{dialog.scenario.symptoms}</td>
                <td className='px-6 py-4'>{dialog.user._id}</td>
                <td className='px-6 py-4'>
                  <Button
                    onClick={() => onClickEvaluate(dialog._id)}
                    label={'Evaluate'}
                  ></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

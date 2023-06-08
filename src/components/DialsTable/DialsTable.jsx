import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";

const DialsTable = ({ deleteDial }) => {
  const dials = useLoaderData();

  return (
    <div className='relative overflow-x-auto sm:rounded-lg m-20'>
      <table className='w-3/4 text-sm text-left text-gray-500 dark:text-gray-400 shadow-md mx-auto'>
        <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3 bg-gray-50 dark:bg-gray-800'>
              Temperature ({`\u00b0`}F)
            </th>
            <th scope='col' className='px-6 py-3'>
              Weight (g)
            </th>
            <th scope='col' className='px-6 py-3 bg-gray-50 dark:bg-gray-800'>
              Time (seconds)
            </th>
            <th scope='col' className='px-6 py-3'>
              Yield (g)
            </th>
            <th scope='col' className='px-6 py-3'>
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {dials.map((dial) => (
            <tr
              key={dial.id}
              className='border-b border-gray-200 dark:border-gray-700'>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'>
                {dial.temp}
              </th>
              <td className='px-6 py-4'>{dial.weight}</td>
              <td className='px-6 py-4 bg-gray-50 dark:bg-gray-800'>
                {dial.time}
              </td>
              <td className='px-6 py-4'>{dial.yield}</td>
              <td>
                <button onClick={() => deleteDial(dial.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DialsTable;

DialsTable.propTypes = {
  deleteDial: PropTypes.func.isRequired,
};

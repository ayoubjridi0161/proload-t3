import { getExerciceNames } from '~/lib/data';
import ExercicesTable from './exercicesTable';
const page = async () => {
  const data = await getExerciceNames();
const filteredData = data.filter(item => item.images.length > 0 );
  return (
    <main className='w-full p-5'>
  <ExercicesTable data={data}/>
  </main>
)
};

export default page;
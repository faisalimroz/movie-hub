
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className=''>
    
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
      <Image src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404 image" className='mt-20 ' width={400} height={600} />
    </div>
  );
};

export default NotFound;
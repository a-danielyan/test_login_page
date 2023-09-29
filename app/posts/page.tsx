import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const Posts = () => {
  const username: RequestCookie | undefined = cookies().get('username')

  return (
    <div>
      <h2 className="text-center text-2xl mt-7 text-slate-600">
        Hello! {username?.value}
      </h2>
    </div>
  );
};

export default Posts;

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePath = ['/list-assessment']
const authPath  = ['/login']


export function middleware(req: NextRequest) {
  // const token = req.cookies.get('access_token')?.value;
  // const {pathname} = req.nextUrl


  // if(privatePath.some((path) => pathname.startsWith(path)) && !token){
  //   return NextResponse.redirect(new URL('/login',req.url))
  // }


  // // if(authPath.some((path) => pathname.startsWith(path))&& token){
  // //   return NextResponse.redirect(new URL('/list-assessment',req.url))
  // // }

  return NextResponse.next(); 
}

// export const config = {
//   matcher: [...privatePath,...authPath],
// };
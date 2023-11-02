export interface IStudentDetail {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: string;
   courses:string[] ;}



export interface IcourseDetail{
 _id: string;
  title: string;
    description: string;
  fees: string;
 
}
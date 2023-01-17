export interface Post{
    _id:number,
    userId:number,
    fullName:string,
    title:string,
    description:string,
    publishedDate:Date,
    approvedDate:Date,
    images:ImageBitmap[],
    isApproved:boolean,
    isActive:boolean
}
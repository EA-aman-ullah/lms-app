import { Link } from "react-router-dom";
import profileService from "../services/profile-service";
import { Me } from "../entites/User";
import Image from "../components/Image";
import uploadAvatarService from "../services/uploadAvatar-service";
import {
  REQUESTS_APPROVEABLE,
  REQUESTS_ASSIGNABLE,
  BORROWED_BOOKS,
  ME,
  REQUESTS_RETURNABLE,
  STUDENTS_WITH_BORROWED,
} from "../constants/queryKeys";

const ProfilePage = () => {
  const { data } = profileService.useGetById<Me>(["me"], "/me");
  const { mutate } = uploadAvatarService.usePost(
    [
      ME,
      STUDENTS_WITH_BORROWED,
      BORROWED_BOOKS,
      REQUESTS_APPROVEABLE,
      REQUESTS_ASSIGNABLE,
      REQUESTS_RETURNABLE,
    ],
    "Image Uploaded Successfully"
  );

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && data) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("id", data._id as string);
      if (data.imageURL) formData.append("imageURL", data.imageURL as string);

      mutate(formData);
    }
  };

  return (
    <div className="relative">
      <div className="bg-profile h-[20rem] rounded-3xl"></div>
      <div className=" absolute left-1/2 -translate-x-1/2 top-1/2 bg-white w-[calc(100%-10%)] md:w-[calc(100%-20%)] shadow-2xl rounded-3xl">
        <div className="flex flex-col gap-[1rem] items-center justify-around sm:flex-row p-[2.5rem]">
          <div className="size-[15rem] rounded-full bg-secondary overflow-hidden text-[7rem] ">
            {data && <Image imageURL={data.imageURL} name={data.name} />}
          </div>
          <div className="cursor-pointer shadow-md hover:shadow-lg bg-body text-nowrap text-[1.6rem] sm:text-[1.8rem] text-headings rounded-full font-[500] px-[2rem] py-[1rem]">
            <label htmlFor="image">Upload Photo</label>

            <input
              id="image"
              type="file"
              onChange={handleImage}
              name="image"
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[1.2rem] m-[1rem] sm:m-[2rem] p-[1rem] sm:p-[2rem] border text-[1.2rem] sm:text-[1.4rem] rounded-3xl ">
          <div>
            <p>Your Name</p>
            <p className="mt-[0.5rem] font-[500] text-nowrap">{data?.name}</p>
          </div>
          <div>
            <p>Email</p>
            <p className="mt-[0.5rem] font-[500] text-nowrap">{data?.email}</p>
          </div>
          <div>
            <p>Phone</p>
            <p className="mt-[0.5rem] font-[500] text-nowrap">{data?.phone}</p>
          </div>
        </div>
        <div className="m-[1rem] sm:m-[2rem] p-[1rem] sm:p-[2rem] border sm:text-[1.4rem] rounded-3xl ">
          <div className="flex  flex-wrap gap-[1rem] items-center justify-between">
            <h2 className="text-[1.8rem] font-[500] text-nowrap">Password</h2>
            <Link
              to={`/set-password/${data?._id}`}
              className=" shadow-md hover:shadow-lg bg-body text-center text-nowrap text-[1.4rem] sm:text-[1.6rem] text-headings rounded-full px-[1rem] py-[0.5rem]"
            >
              Change Password
            </Link>
          </div>
        </div>
        <div className="m-[1rem] sm:m-[2rem] p-[1rem] sm:p-[2rem] border sm:text-[1.4rem] rounded-3xl ">
          <h2 className="text-[1.8rem] font-[500] text-nowrap">Legal</h2>

          <div className="flex mt-[1rem] justify-between">
            <p>Email Verification Status</p>
            <p className="bg-green-100 text-green-700 border-[2px] border-green-300 shadow-md rounded-full px-[1rem] py-[.5rem]">
              {data?.isVarified ? "Verified" : "Not Verified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

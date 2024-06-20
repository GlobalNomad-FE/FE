'use client';
import MyPageForm from '@/components/myProfile/MyPageForm';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';

const MyPage = () => {
  return (
    <div className="flex gap-6 justify-center px-4 bg-[#FAFAFA]">
      <main className="flex justify-center min-h-[100vh] max-h-[100%]  bg-gray50 pt-[142px] pb-[72px] ">
        <div className="width-[800px] pl-[24px] mobile:px-4 flex gap-6 ">
          <SideNavigationMenu />
          <div className="flex tablet:w-[429px] mobile:w-[343px]">
            <MyPageForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

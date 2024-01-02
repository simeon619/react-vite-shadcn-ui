import { DisplayPost } from "@/components/DisplayPost";
import CreatePost from "@/components/createPost";

function Index() {


  return (
    <div className="p-4 flex justify-center   ">
      <div className="w-3/4 md:w-4/5 lg:w-2/5 ">
        <CreatePost />
        <DisplayPost  />
      </div>
    </div>
  );
}

export default Index;


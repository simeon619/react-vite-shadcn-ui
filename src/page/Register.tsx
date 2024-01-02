import RegisterForm from "@/components/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Register() {
  return (
    <div className="p-4 w-full flex justify-center ">
      <Tabs defaultValue="connexion" className="w-2/3 md:w-1/3">
        <TabsList>
          <TabsTrigger value="connexion">connexion</TabsTrigger>
          <TabsTrigger value="inscription">inscription</TabsTrigger>
        </TabsList>
        <TabsContent value="connexion">
          <RegisterForm typeForm="connexion" />
        </TabsContent>
        <TabsContent value="inscription">
          <RegisterForm typeForm="inscription" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

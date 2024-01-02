import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

import { ToastAction } from "@/components/ui/toast";
import { Auth } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { ButtonLoading } from "./LoadButton";
import { RegisterFormSchema, registerFormType } from "@/types/user";
import { useAuthStore } from "@/lib/store";

export default function RegisterForm(props: {
  typeForm: "connexion" | "inscription";
}) {
  const { toast } = useToast();
  const { setAccount} = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: Auth,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      setAccount(null)
      navigate({ to: "/" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Bad Credentials.",
        description: "password or username incorrect.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });


  const form = useForm<registerFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  function onSubmit(data: registerFormType) {
    mutate({
      type: props.typeForm,
      ...data,
    });
  }
  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pseudo"
            render={() => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="pseudo"
                    {...form.register("pseudo")}
                  />
                </FormControl>
                {Boolean(form.formState.errors.pseudo) ? (
                  <FormDescription className="text-red-500">
                    {form.formState.errors.pseudo?.message || ""}
                  </FormDescription>
                ) : (
                  <FormDescription>
                    This is your public pseudo name
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...form.register("password")}
                  />
                </FormControl>
                {Boolean(form.formState.errors.password) ? (
                  <FormDescription className="text-red-500">
                    {form.formState.errors.password?.message || ""}
                  </FormDescription>
                ) : (
                  <FormDescription>Enter your secure password</FormDescription>
                )}
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit">{props.typeForm}</Button>
          )}
        </form>
      </Form>
    </div>
  );
}

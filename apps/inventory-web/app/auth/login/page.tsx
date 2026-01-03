import React from "react";
import * as z from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginTab } from "./_components/LoginTab";
import { RegisterTab } from "./_components/RegisterTab";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Enter a valid password"),
});

function LoginPage() {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center">
        <Tabs
          defaultValue="login"
          className="min-w-sm rounded-lg bg-gray-100 p-4 shadow-lg"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginTab />
          </TabsContent>
          <TabsContent value="register">
            <RegisterTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default LoginPage;

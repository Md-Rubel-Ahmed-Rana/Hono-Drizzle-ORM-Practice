import NoLoggedInLayout from "@/components/layout/NoLoggedInLayout";

export default function Home() {
  const user = false;
  return (
    <main>{user ? <h3>You are logged in</h3> : <NoLoggedInLayout />}</main>
  );
}

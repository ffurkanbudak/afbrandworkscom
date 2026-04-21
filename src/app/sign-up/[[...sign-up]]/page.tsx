import { SignUp } from '@clerk/nextjs';

export const metadata = { title: 'Kayıt' };

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/hesap/yazar-basvurusu"
        signInForceRedirectUrl="/hesap"
      />
    </div>
  );
}

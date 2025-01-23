import './globals.css';
import { Inter } from 'next/font/google';
import { auth, signIn, signOut } from 'auth';
import jackson from '@/lib/jackson';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout() {
  const session = await auth();
  const { apiController } = await jackson();
  const connections = await apiController.getConnections({
    tenant: process.env.TENANT!,
    product: process.env.PRODUCT!,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
          <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
            <div className="flex gap-2">
              {!process.env.ISSUER &&
              connections.length === 0 ? null : session ? (
                <Button
                  onClick={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    'use server';
                    await signIn('boxyhq-saml', undefined, {
                      tenant: process.env.TENANT!,
                      product: process.env.PRODUCT!,
                    });
                  }}
                >
                  Sign In
                </Button>
              )}
              {process.env.ISSUER ? null : connections.length === 0 ? (
                <Button
                  onClick={async () => {
                    'use server';
                    await fetch(`${process.env.NEXTAUTH_URL}/api/sso`, {
                      method: 'POST',
                    });
                    revalidatePath('/');
                  }}
                >
                  Create Connection
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    'use server';
                    await fetch(`${process.env.NEXTAUTH_URL}/api/sso`, {
                      method: 'DELETE',
                    });
                    await signOut();
                  }}
                >
                  Delete Connection
                </Button>
              )}
            </div>

            <p className="text-2xl">Session:</p>
            <code>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </code>
            <hr />
            <p className="text-2xl">Connections:</p>
            <code>
              <pre>{JSON.stringify(connections, null, 2)}</pre>
            </code>
          </main>
        </div>
      </body>
    </html>
  );
}

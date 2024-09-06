import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MovieList() {
  return (
    <>
      <section className="flex flex-col gap-1">
        <h5 className="font-geist-mono text-sm text-black">MY MOVIE LIST</h5>
        <h1 className="font-geist-sans text-2xl font-extrabold text-black sm:text-4xl">
          Organize your movie watching journey
        </h1>
        <p className="font-geist-sans text-sm text-black">
          Keep track of films you&apos;ve seen and ones you want to watch.
        </p>
      </section>

      <Card className="p-3">
        <Tabs defaultValue="watched" className="w-full">
          <TabsList className="w-full font-geist-mono">
            <TabsTrigger
              value="watched"
              className="w-1/2 data-[state=active]:bg-watched data-[state=active]:text-white"
            >
              WATCHED
            </TabsTrigger>
            <TabsTrigger
              value="unwatched"
              className="w-1/2 data-[state=active]:bg-unwatched data-[state=active]:text-white"
            >
              UNWATCHED
            </TabsTrigger>
          </TabsList>
          <TabsContent value="watched">Watched content here</TabsContent>
          <TabsContent value="unwatched">Unwatched content here</TabsContent>
        </Tabs>
      </Card>
    </>
  );
}

import { useRequest } from "alova/client";
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";
import { getFundraiserList } from "@/api/home";
import InfoCard from "@/components/info-card";

export default function IndexPage() {
  const { data, loading, error } = useRequest(() =>
    getFundraiserList({ active: 1 })
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* 新增: 欢迎信息 */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Non-Profit Organization
          </h1>
          <p className="text-xl mb-6">
            We are dedicated to making a positive impact in our community. Join
            us in our mission to create a better world.
          </p>
          <Button color="primary" size="lg">
            Get Involved
          </Button>
        </div>

        {/* 新增: 鼓舞人心的故事 */}
        <div className="p-6 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Inspiring Story</h2>
          <p className="mb-4">
            &quot;Thanks to the support of our donors, we were able to provide
            clean water to over 1,000 families in rural areas last year. Your
            contributions are changing lives!&quot;
          </p>
          <p className="font-bold">- Sarah, Project Coordinator</p>
        </div>

        <h1 className="text-4xl font-bold mb-4">Active Fundraisers</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.data?.map((item) => (
            <InfoCard key={item.FUNDRAISER_ID} {...item} />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}

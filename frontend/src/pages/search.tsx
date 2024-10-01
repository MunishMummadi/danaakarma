import { useForm, useRequest } from "alova/client";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { FormEvent } from "react";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { getAllCategories } from "@/api/search";
import { getFundraiserList } from "@/api/home";
import InfoCard from "@/components/info-card";

export default function SearchPage() {
  const {
    data: categories,
    loading,
    error,
  } = useRequest(() => getAllCategories(), {
    initialData: {
      data: [],
    },
  });

  const {
    loading: searchLoading,
    data,
    form,
    send: submit,
    updateForm,
    reset,
  } = useForm(
    (formData) => {
      return getFundraiserList({
        ...formData,
        category: Number(formData.category),
      });
    },
    {
      initialForm: {
        organizer: "",
        city: "",
        category: "",
        active: 1,
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Search Fundraiser</h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4 space-y-4">
            <Select
              label="category"
              placeholder="select category"
              selectedKeys={[form.category]}
              onChange={(e) =>
                updateForm({
                  category: e.target.value,
                })
              }
            >
              {categories?.data!.map((cat) => (
                <SelectItem key={cat.CATEGORY_ID}>{cat.NAME}</SelectItem>
              ))}
            </Select>
            <Input
              label="organizer"
              placeholder="please input organizer"
              value={form.organizer}
              onChange={(e) => updateForm({ organizer: e.target.value })}
            />
            <Input
              label="city"
              placeholder="please input city"
              value={form.city}
              onChange={(e) => updateForm({ city: e.target.value })}
            />
          </div>
          <div className="flex gap-4">
            <Button fullWidth color="primary" type="submit">
              search
            </Button>
            <Button fullWidth color="secondary" type="button" onClick={reset}>
              reset
            </Button>
          </div>
        </form>
        {error && <p className="text-red-600 font-bold mt-4">{error}</p>}
        {searchLoading && <Spinner className="mt-4" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.data?.map((fundraiser) => (
            <InfoCard key={fundraiser.FUNDRAISER_ID} {...fundraiser} />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}

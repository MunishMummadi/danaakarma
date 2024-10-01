import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Progress } from "@nextui-org/progress";
import { Chip } from "@nextui-org/chip";

import Cover from "/src/cover.webp";

import { useNavigate } from "react-router-dom";

import { Fundraiser } from "@/api";

export default function InfoCard(item: Fundraiser) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/fundraiser/${item.FUNDRAISER_ID}`)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          navigate(`/fundraiser/${item.FUNDRAISER_ID}`);
        }
      }}
    >
      <Card key={item.FUNDRAISER_ID} className="max-w-sm">
        <CardHeader className="flex flex-col items-start">
          <Chip
            className="mb-2"
            color={item.ACTIVE === 1 ? "success" : "default"}
          >
            {item.ACTIVE === 1 ? "Active" : "Inactive"}
          </Chip>
          <h4 className="font-bold text-large">{item.CAPTION}</h4>
          <p className="text-small text-default-500">
            Organized by {item.ORGANIZER}
          </p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Fundraiser image"
            className="object-cover rounded-xl"
            height={200}
            src={Cover}
            width={300}
          />
          <div className="mt-4">
            <p className="text-default-500">Category: {item.CATEGORY_NAME}</p>
            <p className="text-default-500">Location: {item.CITY}</p>
            <div className="mt-2">
              <Progress
                aria-label="Fundraising Progress"
                className="max-w-md"
                value={(item.CURRENT_FUNDING / item.TARGET_FUNDING) * 100}
              />
              <div className="flex justify-between mt-2">
                <span>Current: ${item.CURRENT_FUNDING}</span>
                <span>Goal: ${item.TARGET_FUNDING}</span>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <p className="text-tiny text-default-500">ID: {item.FUNDRAISER_ID}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useRequest } from "alova/client";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { getFundraiser } from "@/api/fundraiser";

export default function FundraiserPage() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: fundraiser,
    loading,
    error,
  } = useRequest(getFundraiser(id!), {
    immediate: !!id,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>{fundraiser.data?.[0].CAPTION}</h1>
        </div>
        <Card className="max-w-[600px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                organizer: {fundraiser.data?.[0].ORGANIZER}
              </p>
              <p className="text-small text-default-500">
                city: {fundraiser.data?.[0].CITY}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <p>{fundraiser.data?.[0].CAPTION}</p>
            <div className="mt-4">
              <p>category: {fundraiser.data?.[0].CATEGORY_NAME}</p>
              <p>target funding: ¥{fundraiser.data?.[0].TARGET_FUNDING}</p>
              <p>current funding: ¥{fundraiser.data?.[0].CURRENT_FUNDING}</p>
            </div>
            <Button className="mt-4" color="primary" onPress={onOpen}>
              donate
            </Button>
          </CardBody>
        </Card>
      </section>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>donate</ModalHeader>
          <ModalBody>
            <p>this function is under construction</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DefaultLayout>
  );
}

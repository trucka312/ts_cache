import { selectPlace } from "@/store/features/place/selector";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Text,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import PlaceCard from "@/components/PlaceCard";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { Place, PlaceType } from "@/model/Place";
import { createPlaceThunk } from "@/store/features/place/thunk";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { places } = useAppSelector(selectPlace);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<Place>({
    address: "",
    image: "",
    name: "",
    description: "",
    type: PlaceType.FOR_YOU,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      type: e.target.value as PlaceType,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    dispatch(createPlaceThunk(form))
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container className="min-h-screen" maxW="container.lg" my={10}>
      <Flex alignItems={"center"} mb={4}>
        <Text fontSize="4xl" fontWeight="bold">
          All places
        </Text>
        <IconButton
          onClick={onOpen}
          ml="auto"
          aria-label="Add place"
          icon={
            <Flex alignItems={"center"} gap={4} px={4}>
              <AddIcon />
              <Text>Add place</Text>
            </Flex>
          }
        />
      </Flex>
      <div className="grid grid-auto-fit gap-4">
        {places &&
          [...places].reverse().map((place) => {
            return <PlaceCard key={place.id} place={place} />;
          })}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new place</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              className="flex flex-col gap-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            >
              <div>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter place name"
                  autoFocus
                  onChange={onChange}
                  value={form.name}
                  name="name"
                />
              </div>
              <div>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Enter place address"
                  onChange={onChange}
                  value={form.address}
                  name="address"
                />
              </div>
              <div>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Enter place description"
                  onChange={onChange}
                  value={form.description}
                  name="description"
                />
              </div>
              <div>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Enter place image url"
                  onChange={onChange}
                  value={form.image}
                  name="image"
                />
              </div>
              <div>
                <FormLabel>Type</FormLabel>
                <Select name="type" onChange={onSelectionChange}>
                  {Object.values(PlaceType).map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant={"ghost"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant={"solid"}
              colorScheme={loading ? "gray" : "blue"}
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? "Submiting..." : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default HomePage;

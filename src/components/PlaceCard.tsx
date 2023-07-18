import React from "react";
import { Place, PlaceType } from "@/model/Place";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Flex,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  createPlaceThunk,
  deletePlaceByIdThunk,
  updatePlaceByIdThunk,
} from "@/store/features/place/thunk";
import { useAppDispatch } from "@/store/hook";

const PlaceCard = ({
  place,
  titleStyle,
}: {
  place: Place;
  titleStyle?: React.CSSProperties;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/place/${place.id}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState<Place>({
    address: place.address,
    image: place.image,
    name: place.name,
    description: place.description,
    type: place.type,
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
    if (openType === "edit") {
      dispatch(
        updatePlaceByIdThunk({
          id: place.id as string,
          data: form,
        })
      )
        .then(() => {
          onClose();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(deletePlaceByIdThunk(place.id as string)).then(() => {
        onClose();
      });
    }
  };

  const [openType, setOpenType] = React.useState<"edit" | "delete">("edit");

  const handleOpen = (type: "edit" | "delete") => {
    setOpenType(type);
    onOpen();
  };

  return (
    <div className="overflow-hidden rounded-md p-4 border flex flex-col gap-2">
      <div className="overflow-hidden rounded-md">
        <img
          onClick={handleNavigate}
          src={place.image}
          alt={place.name}
          style={{
            height: 140,
            objectFit: "cover",
            width: "100%",
          }}
          className="hover:scale-105 transition-all duration-300 rounded-md cursor-pointer"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5
          onClick={handleNavigate}
          style={{
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "8px 0 4px 0",
            textAlign: "left",
            ...titleStyle,
          }}
          className="cursor-pointer hover:text-blue-500 transition-all duration-300"
        >
          {place.name}
        </h5>
        <div
          style={{
            fontWeight: "bold",
            color: "blue",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>{place.address}</span>
        </div>
        <Flex gap={2}>
          <IconButton
            aria-label="Delete"
            icon={<EditIcon boxSize={5} w={4} h={4} />}
            variant={"solid"}
            colorScheme="teal"
            onClick={() => handleOpen("edit")}
          />
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon boxSize={5} w={4} h={4} />}
            variant={"ghost"}
            colorScheme="red"
            onClick={() => handleOpen("delete")}
          />
        </Flex>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {openType === "edit" ? "Edit" : "Delete"} place {place.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              className="flex flex-col gap-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            >
              {openType === "edit" ? (
                <>
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
                          <option
                            key={type}
                            value={type}
                            selected={form.type === type}
                          >
                            {type}
                          </option>
                        );
                      })}
                    </Select>
                  </div>{" "}
                </>
              ) : (
                <div>
                  <p>Are you sure you want to delete this place?</p>
                </div>
              )}
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
    </div>
  );
};

export default PlaceCard;

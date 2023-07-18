import { Place } from "@/model/Place";
import { getPlaceById } from "@/store/reducers/place";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const PlacePage = () => {
  const [place, setPlace] = React.useState<Place | null>(null);
  const { placeId } = useParams<{
    placeId: string;
  }>();
  React.useEffect(() => {
    (async function () {
      const p = await getPlaceById(placeId as string);
      setPlace(p);
      console.log({ p });
    })();
  }, [placeId]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="relative">
      <div className="fixed top-4 left-4">
        <IconButton
          aria-label="Search database"
          icon={<ArrowBackIcon />}
          onClick={handleBack}
        />
      </div>
      <img
        src={place?.image}
        alt={place?.name}
        className="h-[50vh] w-full object-cover"
      />
      <Container my={10}>
        <h1 className="text-3xl font-bold">{place?.name}</h1>
        <p className="text-gray-500">{place?.address}</p>
        <p className="text-gray-500">{place?.description}</p>
      </Container>
    </div>
  );
};

export default PlacePage;

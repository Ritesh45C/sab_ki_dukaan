import React, {useState, useEffect} from 'react';
import {
  RecurringProductContainer,
  ProductContainer,
  ItemImage,
  ItemDetails,
  ItemTitle,
  ItemAvailable,
  ItemSubTitle,
  CustomButtonContainer,
  GridContainer,
  QuantityWeek,
} from './styles';
import TextWithDivider from 'components/TextWithDivider';
import {ProductType} from 'types/Products';
import Item from 'components/CategoryScreen/Item';
import {Image} from 'react-native';
import {Grid, Col} from 'react-native-easy-grid';
import CustomButton from 'components/CustomButton';
import AddByDay from 'components/RecurringOrder/addByDay';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Picker} from 'native-base';
import {Metrics} from 'Theme';
import FirebaseService from 'services/FirebaseService';
import {useDispatch} from 'react-redux';
import LoadingModalSingleton from 'components/Loading';
import DeleteModalSingleton from 'containers/ModalSingleton';
import AddedModalSingleton from 'containers/ModalSingleton';
interface RecurringProductProps {
  route: {
    params: {
      item: ProductType;
    };
  };
}
type keyDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type daysofweekType = {
  key: keyDays;
  text: string;
};

const options = [
  {
    key: 'weekly',
    text: 'Weekly',
  },
  {
    key: 'onceintwoweeks',
    text: 'Once in 2 Weeks',
  },
  {
    key: 'onceinfourweeks',
    text: 'Once in 4 Weeks',
  },
];
export const daysofweek: daysofweekType[] = [
  {
    key: 'sun',
    text: 'SUN',
  },
  {
    key: 'mon',
    text: 'MON',
  },
  {
    key: 'tue',
    text: 'TUE',
  },
  {
    key: 'wed',
    text: 'WED',
  },
  {
    key: 'thu',
    text: 'THU',
  },
  {
    key: 'fri',
    text: 'FRI',
  },
  {
    key: 'sat',
    text: 'SAT',
  },
];

function startOfWeek(date: Date) {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
}
function ObtainTheFollowing4Weeks() {
  const dt = new Date();
  let start = startOfWeek(dt);
  let nextWeek = start;

  let nextFourWeeks = [];
  for (var index = 0; index <= 3; index++) {
    var prevWeek = nextWeek;
    nextFourWeeks.push(new Date(prevWeek.setDate(prevWeek.getDate() + 7)));
  }
  return nextFourWeeks;
}
const RecurringProductScreen = (props: RecurringProductProps) => {
  const {item} = props.route.params;
  const [optionSelected, setOptionSelected] = useState('weekly');
  const [unitsPerDay, setUnitsPerDay] = useState({
    sun: 0,
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
  });
  const [next4Weeks, setNext4Weeks] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [productIsPlaced, setProductIsPlaced] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const SubUnit = (key: keyDays) => {
    let value = unitsPerDay[key];
    if (!value) {
      return;
    }
    setUnitsPerDay(prevState => {
      return {
        ...prevState,
        [key]: value - 1,
      };
    });
  };
  const AddUnit = (key: keyDays) => {
    let value = unitsPerDay[key];
    setUnitsPerDay(prevState => {
      return {
        ...prevState,
        [key]: value + 1,
      };
    });
  };
  const onValueChange = (value: any) => {
    setSelectedDate(value);
  };

  const componentDidMount = () => {
    setIsFetching(true);
    const next4Weeks = ObtainTheFollowing4Weeks();
    setNext4Weeks(next4Weeks);
    setSelectedDate(next4Weeks[0]);
    FirebaseService.GetProductRecurringDetails(item.product_id)
      .then(details => {
        setProductIsPlaced(true);
        setUnitsPerDay(details.schedule);
        setOptionSelected(details.type);
        setIsFetching(false);
      })
      .catch(error => {
        setIsFetching(false);
      });
  };
  useEffect(componentDidMount, []);

  const onAddRecurringProduct = async () => {
    setIsLoading(true);

    FirebaseService.AddProductToRecurringOrder(
      optionSelected,
      item.product_id,
      unitsPerDay,
      selectedDate,
    )
      .then(result => {
        if (result == 'deleted') {
          DeleteModalSingleton.singletonRef.toggle();
          setProductIsPlaced(false);
        } else {
          setProductIsPlaced(true);
        }

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  return (
    <RecurringProductContainer
      contentContainerStyle={{
        paddingHorizontal: Metrics.baseMargin,
        paddingVertical: Metrics.baseMargin,
      }}>
      <LoadingModalSingleton visible={isFetching} />
      <DeleteModalSingleton
        title="Removed"
        description="This recurring product has been removed from your order."
        renderActionsContainer={
          <CustomButton
            text="CLOSE"
            onPress={() => {
              DeleteModalSingleton.singletonRef.toggle();
            }}
            primary
          />
        }
      />
      <ProductContainer>
        <ItemImage>
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
              backgroundColor: 'transparent',
            }}
            source={{uri: item.imgurl}}
          />
        </ItemImage>
        <ItemDetails>
          <ItemTitle>{item.product_name}</ItemTitle>
          <ItemSubTitle>{`${item.product_details}`}</ItemSubTitle>
          <ItemAvailable>
            {item.available
              ? `${item.price_symbol} ${item.price}`
              : 'OUT OF STOCK'}
          </ItemAvailable>
        </ItemDetails>
      </ProductContainer>
      <TextWithDivider text="SET FREQUENCY" />
      <GridContainer>
        {options.map(option => (
          <CustomButtonContainer>
            <CustomButton
              textStyle={{fontSize: 12}}
              primary={optionSelected === option.key && true}
              onPress={() => {
                setOptionSelected(option.key);
              }}
              text={option.text}
              bordered
            />
          </CustomButtonContainer>
        ))}
      </GridContainer>
      <TextWithDivider text="SET QUANTITY" />
      <QuantityWeek>
        {daysofweek.map(day => {
          return (
            <AddByDay
              key={day.key}
              SubUnit={() => SubUnit(day.key)}
              AddUnit={() => AddUnit(day.key)}
              textDay={day.text}
              units={unitsPerDay[day.key]}
            />
          );
        })}
      </QuantityWeek>
      <TextWithDivider text="SET STARTING DATE" />
      <Picker
        style={{marginVertical: Metrics.baseMargin}}
        note
        mode="dropdown"
        selectedValue={selectedDate}
        onValueChange={onValueChange}>
        {next4Weeks.map(date => {
          return <Picker.Item label={`${date.toDateString()}`} value={date} />;
        })}
      </Picker>

      <CustomButton
        isLoading={isLoading}
        text={productIsPlaced ? 'Update' : 'Add'}
        onPress={onAddRecurringProduct}
        primary
      />
    </RecurringProductContainer>
  );
};
export default RecurringProductScreen;

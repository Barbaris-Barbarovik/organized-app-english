import { useAppTranslation, useBreakpoints } from '@hooks/index';
import { Field } from '../shared_styles';
import { HoursFieldProps } from './index.types';
import useHoursField from './useHoursField';
import StandardEditor from '@features/ministry/report/standard_editor';
import Typography from '@components/typography';

const HoursField = ({ person }: HoursFieldProps) => {
  const { t } = useAppTranslation();

  const { tabletUp } = useBreakpoints();

  const { hours, handleHoursChange, readOnly } = useHoursField(person);

  return (
    <Field sx={{ flexDirection: tabletUp ? 'row' : 'column' }}>
      <Typography sx={{ flex: 1 }}>{t('tr_totalHours')}</Typography>
      <StandardEditor
        readOnly={readOnly}
        value={hours}
        onChange={handleHoursChange}
      />
    </Field>
  );
};

export default HoursField;

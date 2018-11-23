import dayjs from 'dayjs';

// defaults
const PERIOD_OF_TIME = 1;
const TIME_UNIT = 'month';
const LANGUAGE = 'JavaScript';
const STARS = '>0';
const LICENSE = '';
const QUERY = '';
const FIRST = 10;

export default {
  getVariables: ({
    language = LANGUAGE,
    stars = STARS,
    license = LICENSE,
    query = QUERY,
    time = PERIOD_OF_TIME,
    timeUnit = TIME_UNIT,
    first = FIRST,
  }) => {
    const created = `>${dayjs()
      .subtract(time, timeUnit)
      .format('YYYY-MM-DD')}`;
    const licenseFilter = license ? `license:${license}` : '';
    const queryFilter = query ? `query:${query}` : '';

    return {
      query: `language:${language} stars:${stars} created:${created} ${licenseFilter} ${queryFilter}`,
      first,
    };
  },
};

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import { useLanguage, languageOptions, type LanguageOption } from '../i18n';

interface SettingsPageProps {
  themeMode: 'bright' | 'light';
  setThemeMode: (mode: 'bright' | 'light') => void;
}

function SettingsPage({ themeMode, setThemeMode }: SettingsPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const [timeZone, setTimeZone] = useState<string>('');

  const timeZoneOptions = useMemo<string[]>(
    () => {
      const intlAny = Intl as unknown as { supportedValuesOf?: (type: string) => string[] };
      return intlAny.supportedValuesOf ? intlAny.supportedValuesOf('timeZone') : [Intl.DateTimeFormat().resolvedOptions().timeZone];
    },
    []
  );

  const getZoneOffsetLabel = (zone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' });
      const parts = formatter.formatToParts(new Date());
      const offsetPart = parts.find((part) => part.type === 'timeZoneName')?.value;
      return offsetPart ? `(${offsetPart})` : '';
    } catch {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'short' });
        const parts = formatter.formatToParts(new Date());
        const offsetPart = parts.find((part) => part.type === 'timeZoneName')?.value;
        return offsetPart ? `(${offsetPart})` : '';
      } catch {
        return '';
      }
    }
  };

  useEffect(() => {
    const storedZone = localStorage.getItem('devops-ai-monitor-timezone');
    if (storedZone) {
      setTimeZone(storedZone);
    } else {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    }

    const storedLanguage = localStorage.getItem('devops-ai-monitor-language');
    if (storedLanguage) {
      setLanguage(storedLanguage as LanguageOption);
    }
  }, []);

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.value as 'bright' | 'light');
  };

  const handleTimeZoneChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setTimeZone(value);
    localStorage.setItem('devops-ai-monitor-timezone', value);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as LanguageOption;
    setLanguage(value);
    localStorage.setItem('devops-ai-monitor-language', value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>{t('settings.title')}</Typography>
      <Paper sx={{ p: 4, bgcolor: '#111b28', border: '1px solid #1f2b3a' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>{t('settings.theme')}</Typography>
        <Typography sx={{ mb: 2, color: '#fff' }}>{t('settings.themeDescription')}</Typography>
        <FormControl>
          <FormLabel sx={{ color: '#9bb3cf' }}>{t('settings.theme')}</FormLabel>
          <RadioGroup value={themeMode} onChange={handleThemeChange}>
            <FormControlLabel value="bright" control={<Radio />} label={t('common.brighterMode')} />
            <FormControlLabel value="light" control={<Radio />} label={t('common.lightMode')} />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ my: 3, borderColor: '#1f2b3a' }} />
        <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>{t('settings.timezone')}</Typography>
        <Typography sx={{ mb: 2, color: '#fff' }}>{t('settings.timezoneDescription')}</Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ color: '#9bb3cf' }} id="timezone-label">{t('settings.timezone')}</InputLabel>
          <Select
            labelId="timezone-label"
            value={timeZone}
            label="Time zone"
            onChange={handleTimeZoneChange}
            sx={{ color: '#fff', '.MuiSelect-icon': { color: '#9bb3cf' } }}
          >
            {timeZoneOptions.map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone} {getZoneOffsetLabel(zone)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ my: 3, borderColor: '#1f2b3a' }} />
        <Typography variant="h6" sx={{ mb: 2, color: '#9bb3cf' }}>{t('settings.language')}</Typography>
        <Typography sx={{ mb: 2, color: '#fff' }}>{t('settings.languageDescription')}</Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ color: '#9bb3cf' }} id="language-label">{t('settings.language')}</InputLabel>
          <Select
            labelId="language-label"
            value={language}
            label="Select your language"
            onChange={handleLanguageChange}
            sx={{ color: '#fff', '.MuiSelect-icon': { color: '#9bb3cf' } }}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ my: 3, borderColor: '#1f2b3a' }} />
        <Typography sx={{ color: '#fff' }}>{t('common.currentSelection')} {themeMode === 'bright' ? t('common.brighterMode') : t('common.lightMode')}</Typography>
        <Typography sx={{ color: '#fff' }}>{t('common.localTimeZone')} {timeZone}</Typography>
        <Typography sx={{ color: '#fff' }}>{t('common.selectedLanguage')} {language}</Typography>
      </Paper>
    </Box>
  );
}

export default SettingsPage;

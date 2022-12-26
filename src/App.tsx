import { getElements } from './utils/getElements';

const { useEffect, useState } = window.React;
const {
  ScopedCssBaseline,
  Stack,
  Link,
  Divider,
  Button,
  createTheme,
  Typography,
  ThemeProvider,
  Box
} = window.MaterialUI;

export const WIDTH = 400;
export const HEIGHT = 300;

export default function App() {
  const [focusId, setFocusId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [[left, top], setPos] = useState<readonly [string, string]>([
    `${(window.innerWidth - WIDTH) / 2}px`,
    `${(window.innerHeight - HEIGHT) / 2}px`,
  ]);

  useEffect(() => {
    GM.registerMenuCommand('Open anchor list', () => {
      setOpen(true);
    });
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        {open && (
          <Stack
            sx={{
              position: 'fixed',
              backgroundColor: 'background.paper',
              borderRadius: '5px',
              boxShadow: 2,
              zIndex: 0,
              top,
              left,
              width: `${WIDTH}px`,
              height: `${HEIGHT}px`
            }}

            onMouseDown={({
              target,
              currentTarget,
              pageX,
              pageY
            }) => {
              if (!(target instanceof Element)) {
                return;
              }

              if (target.tagName === 'BUTTON') {
                return;
              }

              const x = pageX - currentTarget.offsetLeft;
              const y = pageY - currentTarget.offsetTop;

              const handleMouseMove = (ev: MouseEvent) => {
                ev.preventDefault();

                const top = ev.pageY - y;
                const left = ev.pageX - x;

                setPos([`${left}px`, `${top}px`]);
              };

              const handleMouseUp = () => {
                document.body.removeEventListener('mousemove', handleMouseMove);
                document.body.removeEventListener('mouseup', handleMouseUp);
                document.body.removeEventListener('mouseleave', handleMouseUp);
              };

              document.body.addEventListener('mousemove', handleMouseMove);
              document.body.addEventListener('mouseup', handleMouseUp);
              document.body.addEventListener('mouseleave', handleMouseUp);
            }}
          >
            <Stack direction='row' justifyContent='flex-end'>
              <Button onClick={() => setOpen(false)}>
                閉じる
              </Button>
            </Stack>
            <Divider />
            <Stack
              sx={{
                padding: '0.5rem',
                overflow: 'auto'
              }}
            >
              {[...getElements()].map(([id, e]) => {
                const hash = `#${id}`;

                return (
                  <Stack
                    direction='row'
                    key={id}
                    alignItems='center'
                    spacing={1}
                  >
                    <a
                      href={hash}
                      onMouseLeave={() => setFocusId(undefined)}
                      onMouseEnter={() => setFocusId(id)}
                    >
                      <Link>{hash}</Link>
                    </a>
                    <Typography
                      fontSize='small'
                      color='text.secondary'
                      component='span'
                    >
                      {e.clientWidth}x{e.clientHeight}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        )}
        {focusId && (
          <Box
            component='canvas'
            sx={{ pointerEvents: 'none' }}
            position='fixed'
            zIndex={2}
            top='0px'
            left='0px'
            ref={(cv: HTMLCanvasElement | null) => {
              if (!cv) {
                return;
              }

              cv.width = window.innerWidth;
              cv.height = window.innerHeight;

              const ctx = cv.getContext('2d');

              if (!ctx) {
                return;
              }

              ctx.clearRect(0, 0, cv.width, cv.height);
              ctx.strokeStyle = 'red';

              const element = document.getElementById(focusId);

              if (!element) {
                return;
              }

              const { width, height, top, left } = element.getBoundingClientRect();

              ctx.strokeRect(
                Math.floor(left),
                Math.floor(top),
                width,
                height
              );
            }}
          />
        )}
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

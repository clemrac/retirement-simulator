import { Box, Button, CircularProgress } from "@mui/material"

export default function LoadingButton({
    isLoading,
    txt,

    onClick
}) {
    return (
        <Box sx={{ m: 1, position: 'relative' }}>
            <Button
                variant="contained"
                disabled={isLoading}
                onClick={onClick}
            >
                {txt}
            </Button>
            {isLoading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: 'green',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    )
}
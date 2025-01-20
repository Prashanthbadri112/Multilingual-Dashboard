import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchTableData, Post } from "../Apidata";
import { useTranslation } from "react-i18next";

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1, // Ensure it stays on top
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const { ref, inView } = useInView(); // Observer for infinite scroll
  const { t } = useTranslation();

  const fetchMoreData = async ({ pageParam = 1 }: { pageParam?: number }): Promise<Post[]> => {
    try {
      const data = await fetchTableData(pageParam);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Infinite query to fetch paginated data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchMoreData,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Fetch next page when inView becomes true
  useEffect(() => {
    console.log("inView", inView);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Typography align="center" sx={{ my: 4 }}>
        <CircularProgress />
        <span> Loading data...</span>
      </Typography>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("id")}</StyledTableCell>
            <StyledTableCell>{t("title")}</StyledTableCell>
            <StyledTableCell align="center">{t("desc")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages.flatMap((page) =>
            page.map((post) => (
              <StyledTableRow key={post.id}>
                <StyledTableCell align="justify">{post.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {post.title}
                </StyledTableCell>
                <StyledTableCell align="justify">{post.body}</StyledTableCell>
              </StyledTableRow>
            ))
          )}

          <StyledTableRow>
            <StyledTableCell colSpan={3} align="center">
              <div ref={ref}>
                {isFetchingNextPage && <CircularProgress size={24} />}
                {!hasNextPage && (
                  <Typography variant="body2">No more data to load.</Typography>
                )}
              </div>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
